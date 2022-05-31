START .\lorabackend\init.bat
ping 127.0.0.1 -n 6 > nul
START .\lora\init.bat
ping 127.0.0.1 -n 6 > nul
START code ./lorabackend  && code ./lora
EXIT