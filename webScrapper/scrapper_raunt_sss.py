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

driver.get("https://www.raunt.com/sss")

concept_divs = driver.find_elements(By.XPATH, '/html[1]/body[1]/div[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]//div[@class="accordion"]')

i_cnt = 0

#Scrapping Concepts
for i in concept_divs:
    concepts.append(i.text.split("\n")[1])

description_divs = driver.find_elements(By.XPATH, '/html[1]/body[1]/div[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]//div[@class="panel"]')

#Scrapping Descriptions
for description in description_divs:
    
    concatParagraph = ""
    paragraphs = description.find_elements(By.XPATH, '*')
    for paragraph in paragraphs:

        concatParagraph = concatParagraph + paragraph.get_attribute("textContent")
    
        concatParagraph = re.sub("\n\t*",",",concatParagraph)

    descriptions.append(concatParagraph)


# print(concepts[1])
# print(descriptions[1])

df = pd.DataFrame({"source":"https://www.raunt.com/sss","concept":concepts,"description":descriptions})

print(df.head())

df.to_csv("csv_files/csv_Raunt.csv",index=False)

# time.sleep(10)

