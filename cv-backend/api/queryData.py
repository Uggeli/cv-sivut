from fmiopendata.wfs import download_stored_query
from datetime import datetime, timedelta

def QueryWeatherData(place=None, start_time=None, end_time=None) -> list:
      """Query Weather data args place=none, start_time=none, end_time=none"""
      query_str = "fmi::observations::weather::multipointcoverage"
      end_time = datetime.fromisoformat(end_time).isoformat(timespec="seconds")  \
            if end_time \
                  else (datetime.utcnow()).isoformat(timespec="seconds")
      start_time = datetime.fromisoformat(start_time).isoformat(timespec="seconds") \
            if start_time \
                  else (datetime.fromisoformat(end_time) - timedelta(hours=1)).isoformat(timespec="seconds")
      place = place if place else "Turku"

      args = ['place=' + place, 'starttime=' +start_time + 'Z', 'endtime=' + end_time + 'Z']

      obs = download_stored_query(query_str, args)
      print(f"Querying FMI for {start_time} - {end_time} from {place}")
      return [UnpackQueryData(data) for data in obs.data.items()]

def UnpackQueryData(data):
      unpacked_query = {}
      unpacked_query['date'] = data[0]
      for location, observations in data[1].items():
            for key, unit in observations.items():
                  value = unit['value']
                  unpacked_query[key] = value if value == value else 0
            unpacked_query['location'] = location

      return unpacked_query
