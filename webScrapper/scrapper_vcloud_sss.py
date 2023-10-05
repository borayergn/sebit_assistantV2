from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import time
from selenium.webdriver.common.by import By
import re

# from webdriver_manager.chrome import ChromeDriverManager


concepts = list()
descriptions = list()

# driver = webdriver.Chrome(ChromeDriverManager().install()) # Hata verdi ama seleniumun yeni updateinde driver path belirtmeye gerek yokmuş kendi handle ediyomuş


driver = webdriver.Chrome()

driver.get("https://www.sebitvcloud.com/tr/yardim.jsp")

container = driver.find_element(By.XPATH,'/html[1]/body[1]/div[1]/section[2]/div[1]/div[1]/div[1]/div[1]/div[1]')

#Scrapping Concepts

titles = container.find_elements(By.XPATH,'div[@class="acctitle"]')

for title in titles:
    concepts.append(title.get_attribute("textContent"))

#Scrapping Descriptions

contents = container.find_elements(By.XPATH,'div[@class="acc_content clearfix"]')

for content in contents:
    descriptions.append(content.get_attribute("textContent"))

# print("Concept:",concepts)
# print("Descriptions",descriptions)

df = pd.DataFrame({"source":"https://www.sebitvcloud.com/tr/yardim.jsp","concept":concepts,"description":descriptions})

print(df.head())

df.to_csv("csv_files/csv_V-Cloud.csv",index=False)

