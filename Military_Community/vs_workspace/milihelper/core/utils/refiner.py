from datetime import datetime

#result query type convert and formatter
def result_query_refiner(result):
    for index in result:
        for column, value in index.items():
            if type(value) is datetime:
                index[column] = value.strftime("%Y-%m-%d %H:%M:%S")
    return result