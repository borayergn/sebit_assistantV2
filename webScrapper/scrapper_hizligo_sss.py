from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import time
from selenium.webdriver.common.by import By
import re

concepts = list()
descriptions = list()


driver = webdriver.Chrome()

driver.get("https://www.hizligo.com/sss")

container = driver.find_elements(By.XPATH, '/html[1]/body[1]/section[1]/div[1]/div[2]/div[1]/*')

for pair in container:
    title = pair.find_element(By.XPATH,'div[@class="toggle-title"]')
    title_text = title.get_attribute("textContent")
    title_text = re.sub("\n\s*","",title_text)
    concepts.append(title_text)
    inner = pair.find_element(By.XPATH,'div[@class="toggle-inner"]')
    inner_text = inner.get_attribute("textContent")
    inner_text = re.sub("\n\s*","",inner_text)
    descriptions.append(inner_text)


df = pd.DataFrame({"source":"https://www.hizligo.com/sss","concept":concepts,"description":descriptions})

print(df.head())

df.to_csv("csv_files/csv_Hizligo.csv",index=False)



