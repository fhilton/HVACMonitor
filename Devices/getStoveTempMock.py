#!/usr/bin/python


import time
import math
import sys
import json

# Define a function to convert celsius to fahrenheit.
def c_to_f(c):
    return c * 9.0 / 5.0 + 32.0

temp = 30
internal = 31
print '-------------------------------------------------'
print 'Thermocouple Temperature: {0:0.3F}*C / {1:0.3F}*F'.format(temp, c_to_f(temp))
print '    Internal Temperature: {0:0.3F}*C / {1:0.3F}*F'.format(internal, c_to_f(internal))
if not math.isnan(temp):
    data = {}
    data['temp'] = c_to_f(temp)
    # print(c_to_f(temp))
    print(json.dumps(data))
    sys.stdout.flush()

