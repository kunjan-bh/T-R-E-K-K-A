import wikipedia
import requests
from dotenv import load_dotenv
import os

from tavily import TavilyClient




# Load .env file
load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

Tavily_API_KEY = os.getenv("Tavily_API_KEY")



def wikipedia_tool(query: str):
    try:
        return wikipedia.summary(query, sentences=3)
    except:
        return "No Wikipedia data found."
    


tavily = TavilyClient(api_key=Tavily_API_KEY)

def tavily_search(query: str, max_results: int = 3):
    """
    Search Tavily and return structured results.
    """
    res = tavily.search(query=query, max_results=max_results)

    if not res["results"]:
        return []

    # Return a structured list instead of a single string
    return [
        {
            "title": r.get("title", "No title"),
            "content": r.get("content", "No summary"),
            "source": r.get("source", "Nepali News")
        }
        for r in res["results"]
    ]




def weather_tool(city: str, days: int = 1):
    """
    Fetch weather forecast for the city.
    days: 1=today, 2=tomorrow, 3=next 3 days max
    Returns dict:
        { "city": str, "country": str, "forecast": [ {date, avg_temp, condition}, ... ] }
    """
    try:
        if not OPENWEATHER_API_KEY:
            return {"error": "Weather API key missing."}

        # Append country code for Nepali cities
        if "," not in city:
            city = f"{city},NP"

        url = "https://api.openweathermap.org/data/2.5/forecast"
        params = {
            "q": city,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric",
        }

        res = requests.get(url, params=params)
        if res.status_code != 200:
            return {"error": res.json().get("message", "Unable to fetch weather.")}

        data = res.json()
        forecast_list = data.get("list", [])

        # Organize into days
        daily = {}
        for entry in forecast_list:
            date_str = entry["dt_txt"].split(" ")[0]
            if date_str not in daily:
                daily[date_str] = {"temps": [], "conditions": []}
            daily[date_str]["temps"].append(entry["main"]["temp"])
            daily[date_str]["conditions"].append(entry["weather"][0]["description"])

        # Build forecast output
        sorted_dates = sorted(daily.keys())
        output = []
        for i, date in enumerate(sorted_dates):
            if i >= days:
                break
            temps = daily[date]["temps"]
            avg_temp = sum(temps) / len(temps)
            conds = daily[date]["conditions"]
            main_condition = max(set(conds), key=conds.count)
            output.append({
                "date": date,
                "avg_temp": round(avg_temp, 1),
                "condition": main_condition
            })

        return {
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "forecast": output
        }

    except Exception as e:
        return {"error": str(e)}
    


    
def nepali_news_tool(query: str, max_results: int = 5):
    """
    Fetch latest Nepali news using Tavily.
    Returns structured list of articles.
    """
    search_query = f"Nepal {query} site:onlinekhabar.com OR site:setopati.com OR site:ratopati.com"
    articles = tavily_search(search_query, max_results=max_results)

    if not articles:
        return []

    return articles


