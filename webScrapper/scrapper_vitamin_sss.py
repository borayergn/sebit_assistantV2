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

driver.get("https://www.vitaminegitim.com/ortaokul/sss.jsp")



#Scrapping Concepts Vitamin-LGS
concept_divs_lgs = driver.find_elements(By.XPATH, '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]//div[@class="accordion"]')

for i in concept_divs_lgs:
    concepts.append(i.get_attribute("textContent").split(") ")[1]) # Splitting question with question number using ") " pattern. (Ex: "1) Vitamin LGS nedir?") 



#Scrapping Concepts Vitamin-Kitap
concept_divs_kitap = driver.find_elements(By.XPATH,'/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]//div[@class="accordion"]')

for i in concept_divs_kitap:
    concepts.append(i.get_attribute("textContent").split(") ")[1]) # Splitting question with question number using ") " pattern. (Ex: "1) Vitamin LGS nedir?")

# print(concepts)

#Scrapping Descriptions Vitamin-LGS
description_divs_lgs = driver.find_elements(By.XPATH, '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]//div[@class="panel"]')

for description in description_divs_lgs:

    concatParagraph = ""

    paragraphs = description.find_elements(By.XPATH, '*')

    for paragraph in paragraphs:
        concatParagraph = concatParagraph + paragraph.get_attribute("textContent")
        concatParagraph = re.sub("\n\t*",",",concatParagraph)

    descriptions.append(concatParagraph)

#Scrapping Descriptions Vitamin-Kitap

description_divs_kitap = driver.find_elements(By.XPATH, '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]//div[@class="panel"]')
for description in description_divs_kitap:

    concatParagraph = ""

    paragraphs = description.find_elements(By.XPATH, '*')

    for paragraph in paragraphs:
        concatParagraph = concatParagraph + paragraph.get_attribute("textContent")
        concatParagraph = re.sub("\n\t*",",",concatParagraph)

    descriptions.append(concatParagraph)

df = pd.DataFrame({"source":"https://www.vitaminegitim.com/ortaokul/sss.jsp","concept":concepts,"description":descriptions})

print(df.head())

df.to_csv("csv_files/csv_Vitamin.csv",index=False)

