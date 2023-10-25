from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import time
from selenium.webdriver.common.by import By
import re
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

concepts = list()
descriptions = list()

driver = webdriver.Chrome()

concepts = list()
descriptions = list()

base_url = "https://ders.eba.gov.tr/yardim-sss/"
driver.get(base_url)

wait = WebDriverWait(driver, 10)  # Adjust the timeout (10 seconds in this example)

all_links = driver.find_elements(By.XPATH,'/html[1]/body[1]/section[6]//div[@class="search-datas"]')

#Ogrenci Eba
for link_index in range(41):
    
    link_url = all_links[link_index].get_attribute("link")

    #Skip PDF
    if link_url == None:
        continue

    direct_url = base_url +"/"+link_url

    driver.get(direct_url) 
    container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")


    concepts.append(container[1].text)
    descriptions.append(container[2].text)
    # for i in container:
    #     print(i.text)

    driver.back()

print("concepts:",concepts)
print("descriptions:",descriptions)

for link_index in range(80,170):

    link_url = all_links[link_index].get_attribute("link")

    #Skip PDF
    if link_url == None:
        continue

    direct_url = base_url +"/"+link_url

    driver.get(direct_url) 
    container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")


    concepts.append(container[1].text)
    descriptions.append(container[2].text)

    driver.back()


print("concepts:",concepts)
print("descriptions:",descriptions)
        

for link_index in range(219,len(all_links)):

    link_url = all_links[link_index].get_attribute("link")

    #Skip PDF
    if link_url == None:
        continue

    direct_url = base_url +"/"+link_url

    driver.get(direct_url) 
    container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")


    concepts.append(container[1].text)
    descriptions.append(container[2].text)

    driver.back()


print("concepts:",concepts)
print("descriptions:",descriptions)

df = pd.DataFrame({"source":"https://ders.eba.gov.tr/yardim-sss/","concept":concepts,"description":descriptions})

print(df.head())

df.to_csv("csv_files/csv_EBA_sss.csv",index=False)
        