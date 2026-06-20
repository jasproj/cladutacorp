#!/bin/bash
/usr/bin/python3 ~/cladutacorp/build_master_and_push.py && \
/usr/bin/python3 ~/cladutacorp/merge_phones.py && \
/usr/bin/python3 ~/cladutacorp/claduta_whatsapp_prep.py
