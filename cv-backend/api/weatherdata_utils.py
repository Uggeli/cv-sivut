from .queryData import QueryWeatherData
from datetime import datetime, timedelta
from django.db.utils import IntegrityError
from .models import WeatherData


def filterQuery(queryset ,location, endtime, starttime):
    return filterByDate(filterbyLocation(queryset, location), endtime, starttime)

def filterByDate(queryset, endtime, starttime):
    return [wd for wd in queryset if \
        datetime.fromisoformat(starttime) \
            <= wd.date <=\
                 datetime.fromisoformat(endtime) ]

def filterbyLocation(queryset, location):
    return [wd for wd in queryset if wd.location.__contains__(location.capitalize())]

def fillMissingData(queryset, endtime, starttime, location):
    while(datetime.fromisoformat(starttime) + timedelta(hours=1) < datetime.fromisoformat(endtime)):
        new_endtime = (datetime.fromisoformat(starttime) + timedelta(days=5)).isoformat(timespec="seconds")
        if not filterByDate(queryset,new_endtime, starttime):
            queryForNewData(location, new_endtime, starttime)
        starttime = new_endtime
    return filterQuery(WeatherData.objects.all(), location, endtime, starttime)

def saveToDb(data):
    # print(data)
    newWD = WeatherData(
        date = data['date'],
        location = data['location'],
        Air_temperature = data['Air temperature'],
        Wind_speed = data['Wind speed'],
        Gust_speed = data['Gust speed'],
        Wind_direction = data['Wind direction'],
        Relative_humidity = data['Relative humidity'],
        Dew_point_temperature = data['Dew-point temperature'],
        Precipitation_amount = data['Precipitation amount'],
        Precipitation_intensity = data['Precipitation intensity'],
        Snow_depth = data['Snow depth'],
        Pressure = data['Pressure (msl)'],
        Horizontal_visibility = data['Horizontal visibility'],
        Cloud_amount = data['Cloud amount'],
    )
    try:
        newWD.save()
    except IntegrityError as e:
        # print(e)
        pass

def queryForNewData(location, endtime, starttime):
    new_data = []
    if (datetime.fromisoformat(starttime) + timedelta(days=5)) < datetime.fromisoformat(endtime):
        while(datetime.fromisoformat(starttime) + timedelta(days=5) < datetime.fromisoformat(endtime)):
            new_endtime = (datetime.fromisoformat(starttime) + timedelta(days=5)).isoformat(timespec="seconds")
            new_data += QueryWeatherData(location, start_time=starttime, end_time=new_endtime)
            starttime = new_endtime
    else:
        new_data += QueryWeatherData(location, start_time=starttime, end_time=endtime)

    for data in new_data:
        saveToDb(data)