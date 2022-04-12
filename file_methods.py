import os

filenames = os.listdir()

for f in filenames:
    if(f[-3:-1] == "ST"):
        print("""<option value=" """[0:-1] + f + """">""" + f[0:-4] +  "</option>")