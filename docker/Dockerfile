FROM ubuntu:18.04
LABEL maintainer="CyberHead <info@cyberhead.uk>" \
    org.label-schema.name="CyberHead" \
    org.label-schema.url="http://www.cyberhead.uk/" \
    org.label-schema.version="1.0" 

ENV SERIES 5.0
ENV LANG C.UTF-8

RUN apt-get update \
 && apt-get install apt-utils -y --no-install-recommends \
                    python3 \
                    python3-pip \
                    python3-setuptools \
                    git \
                    vim

RUN apt-get install nodejs -y --no-install-recommends \
                    npm 

RUN echo "root:root" | chpasswd

RUN useradd -ms /bin/bash cyberhead -p root
USER cyberhead
WORKDIR /home/cyberhead


#RUN cd /home/CyberHead/web \
#    && npm install -y


EXPOSE 80

#ENTRYPOINT ["/home/CyberHead"]
