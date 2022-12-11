import api


if __name__ == "__main__":
    api.get_fed().to_json('static/fed.json', orient='records')