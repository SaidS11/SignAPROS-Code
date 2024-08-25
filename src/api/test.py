import os
from pathlib import Path
import sys

def init(data):
    return "Saludos Python" + data

if(sys.argv[1] == "init"):
    data = [sys.argv[2]]
    print(init(data))
    sys.stdout.flush()
