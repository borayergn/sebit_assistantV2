from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import time
from selenium.webdriver.common.by import By
import re
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# from webdriver_manager.chrome import ChromeDriverManager


concepts = list()
descriptions = list()

# driver = webdriver.Chrome(ChromeDriverManager().install()) # Hata verdi ama seleniumun yeni updateinde driver path belirtmeye gerek yokmuş kendi handle ediyomuş


driver = webdriver.Chrome()

concepts = list()
descriptions = list()

base_url = "https://ders.eba.gov.tr/yardim-sss/"
driver.get(base_url)

# container = driver.find_elements(By.XPATH, '/html[1]/body[1]/section[6]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]//div[@class="card search-data-containers"]')

wait = WebDriverWait(driver, 10)  # Adjust the timeout (10 seconds in this example)
# box_counter = 1
# frame_counter = 1
# for box in container:

#     box_counter+=1
#     print("Box Counter:",box_counter,"Len of container",len(container))
#     if box_counter >= len(container):
#         break

#     clickables = container.find_elements(By.XPATH,'//div[@class="search-datas"]')

#     for frame in clickables:
#         frame_counter+=1
#         print("Frame Counter:",frame_counter,"Len of clickables",len(clickables))
#         if frame_counter >= len(clickables):
#             break

#         actions = ActionChains(driver)

#         wait.until(EC.element_to_be_clickable(frame))
#         actions.move_to_element(frame).click().perform()
    
#         popup = wait.until(EC.visibility_of_element_located((By.ID, "popup-container")))

        
#         popup_container = driver.find_element(By.XPATH,"/html[1]/body[1]/div[1]")

#         close_button = popup_container.find_element(By.ID,"close-button")

#         wait.until(EC.frame_to_be_available_and_switch_to_it((By.ID,"content-iframe")))

#         iframe_container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")
#         for i in range(len(iframe_container)):
#             if i == 1:
#                 print("Question:",iframe_container[i].text)
#             if i == 2:
#                 print("Answer:",iframe_container[i].text)

#         driver.switch_to.default_content()
#         close_button.click()

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
    # for i in container:
    #     print(i.text)

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
    # for i in container:
    #     print(i.text)

    driver.back()


print("concepts:",concepts)
print("descriptions:",descriptions)

df = pd.DataFrame({"source":"https://ders.eba.gov.tr/yardim-sss/","concept":concepts,"description":descriptions})

print(df.head())

df.to_csv("csv_files/csv_EBA_sss.csv",index=False)
        