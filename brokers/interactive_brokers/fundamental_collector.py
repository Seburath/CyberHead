from datetime import datetime, timedelta, date
from ib.ext.Contract import Contract
from ib.opt import ibConnection
from time import sleep, strftime
from brokers.interactive_brokers.database import Scraped, Fundamentals
from brokers.interactive_brokers.interactive import makeContract
from brokers.interactive_brokers.config import ib_host, ib_port, ib_client_id
import schedule

tickersId = {}


def watcher(msg):
    print(msg)

def tickPriceHandler(msg):
    fundamentals = str(msg).split('value=')[1].split(';')
    handler_dict = {}
    if msg.tickType == 47 and len(fundamentals) > 10:
        for val in fundamentals:
            try:
                data = val.split('=')
                if data != ['']:
                    handler_dict[data[0]] = data[1].replace('>','')
            except Exception as e:
                print(e)
                continue
        handler_dict['TICKER'] = tickersId[msg.tickerId][0]
        handler_dict['EXCHANGE'] = tickersId[msg.tickerId][1]
        handler_dict['DATE'] = datetime.now()
        Fundamentals.create(**handler_dict)
        print(handler_dict)

def load_scraped_symbols():
    query = Scraped.select()
    return [(record.symbol, record.exchange, record.id) for record in query]


def collect(symbols: list) -> None:
    tws = ibConnection(ib_host,port=ib_port, clientId=ib_client_id)
    tws.registerAll(watcher)
    tws.register(tickPriceHandler, 'TickString')
    for symbol in symbols:
        tws.connect()
        ticker = symbol[0]
        print(ticker)
        stock_fundamental = {}
        tws.reqMktData(symbol[2], makeContract(ticker), "233, 236, 258", False)
        tickersId[symbol[2]] = [symbol[0],symbol[1]]
        sleep(10)
        tws.disconnect()

def recurrent_action():
    scraped_symbols = load_scraped_symbols()
    collect(scraped_symbols)

if __name__ == '__main__':
    recurrent_action()
