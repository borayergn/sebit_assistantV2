from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import time
from selenium.webdriver.common.by import By
import re
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import yaml

from tqdm import tqdm

import os
import warnings
import time

"""
Class Attributes:

PUBLIC ATTRIBUTES
-------
output_dir: Output directory of the output csv files for all scrap functions.
options: An Options class instance of selenium.webdriver for holding selenium driver options to pass them to the webdriver of all scrapers.

PRIVATE ATTRIBUTES
-------
__config: A dictionary variable to hold url configurations of sites to be scrapped.(urls are coming from .yaml file).


Class Methods:

PUBLIC METHODS
-------
---------------------------------------
getConfig(): getter of config attribute.
---------------------------------------
getOptions(): getter of options attribute.
---------------------------------------
setOptions(**kwargs): setter of options attribute.
gets **kwargs as arguments and passes the taken arguments to option attribute's add_argument method one by one

Example Usage: scrapper.setOptions(size = 'window-size=1920x1080',h = 'headless', gpu ="--disable-gpu")
---------------------------------------
setOutputDir(dir): Setter of output_dir attribute.
---------------------------------------
meb_faq(): Scrapper of meb url
---------------------------------------
osym_faq(): Scrapper of osym url
---------------------------------------
eba_faq(): Scrapper of eba url
---------------------------------------
hizligo_faq(): Scrapper of hizligo url
---------------------------------------
raunt_faq(): Scrapper of raunt url
---------------------------------------
vcloud_faq(): Scrapper of vcloud url
---------------------------------------
vitamin_faq(): Scrapper of vitamin url
---------------------------------------
yok_faq(): Scrapper of yök url
---------------------------------------
scrapAll(): Wrapper function that calls all scrapper functions
---------------------------------------
scrapJustSebit(): Wrapper function that calls only Sebit domain scrapper functions
---------------------------------------
scrapJustEdu(): Wrapper functions that wrapper functions outside of Sebit domain
---------------------------------------
concatMultipleCsv(input_path, output_path): 
takes an input path which contain multiple csv files, then concatenates them and saves them into output path.

output_path may be path/to/file/file.csv, first it checks if path/to/file is exists or not, then if it not exists it creates it.
after creating the directory, it saves the file.csv into directory path/to/file
---------------------------------------

PRIVATE METHODS
-------

---------------------------------------
__setConfig(): reads the yaml config file and sets the attribute __config
yaml file name should be scrapConfig.yaml.
---------------------------------------
"""
class Scrapper:
    def __init__(self,output_dir = ""):
        self.output_dir = output_dir
        self.options = Options()
        self.__config = self.__setConfig()
        #Multi processing

    # SETTERS AND GETTERS

    def __setConfig(self):
        with open('scrapConfig.yaml','r') as f:
            urls = yaml.safe_load(f)
            return urls
        
    def getConfig(self):
        return self.__config

    # Takes unknown number of arguments and sets options
    def setOptions(self,**kwargs):
        for arg in kwargs.values():
            self.options.add_argument(arg)

    def getOptions(self):
        return self.options._arguments
    
    def setOutputDir(self,dir):
        self.output_dir = dir
    
    # PRIVATE FUNCTION FOR HANDLING OUTPUT FILE
    def __handleOutput(self,output_file_name,df):
        faq_df = df

        def clearNewLine(text):
            return(re.sub("\n","",text))
        faq_df["question"] = faq_df["question"].apply(clearNewLine)
        faq_df["answer"] = faq_df["answer"].apply(clearNewLine)
        

        if (not os.path.exists(self.output_dir) and (self.output_dir != "")):
            os.mkdir(self.output_dir)
            warnings.warn("New directory created")
            
        full_path = output_file_name

        if self.output_dir != "":
            full_path = os.path.join(self.output_dir,output_file_name)

        faq_df.to_csv(full_path, index=False)


    #SCRAP FUNCTIONS
    #---------------------   

    # MEB
    def meb_faq(self,output_file_name):
        faq_df = pd.DataFrame(columns=[ "question", "answer","source"])

        driver = webdriver.Chrome(options=self.options)


        urls = self.__config["urls"]["meb"]


        def get_qa_pairs(url):
    
            driver.get(url)
            
            questions = driver.find_elements(By.XPATH, '//body[1]/section[1]/div[1]/div[2]/div[1]/div[1]/div[2]/ul/li/strong')
            answers = driver.find_elements(By.XPATH, '//body[1]/section[1]/div[1]/div[2]/div[1]/div[1]/div[2]/ul/li')
            
            questions = [i.text for i in questions]
            answers = [i.text for i in answers]
            
            assert len(questions)==len(answers), url

            data_dict = { "question": [], "answer":[],"source": []}
            
            temp_df = pd.DataFrame(columns=[ "question", "answer","source"])

            for i in range(len(questions)):
                answers[i] = answers[i].replace(questions[i], "")
                answers[i] = answers[i].replace('\n', " ")

                # data_dict = {"source": url+f'/{i}', "question": questions[i], "answer": answers[i]}
                data_dict["source"].append(url+f'/{i}')
                data_dict["question"].append(questions[i])
                data_dict["answer"].append(answers[i])

            temp_df = pd.concat([temp_df, pd.DataFrame(data=data_dict)])

            return temp_df
        
        meb_dfs = list(map(get_qa_pairs, urls))

        faq_df = pd.concat(meb_dfs)
        faq_df.reset_index(drop=True, inplace=True)

        self.__handleOutput(output_file_name,faq_df)

        driver.close()


    # OSYM
    def osym_faq(self,output_file_name):

        faq_df = pd.DataFrame(columns=[ "question", "answer","source"])

        driver = webdriver.Chrome(options=self.options)

        url = self.__config["urls"]["osym"]

        driver.get(url)
                   
        ques = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[4]/div[2]/div[1]/table[1]/tbody[1]/tr/td[2]/p[1]')
        anws = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[4]/div[2]/div[1]/table[1]/tbody[1]/tr/td[1]/p[1]')

        ques = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[4]/div[2]/div[1]/table[1]/tbody[1]/tr/td[2]/p[1]')
        ques = [i.text for i in ques]

        answ = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[4]/div[2]/div[1]/table[1]/tbody[1]/tr/td[1]/p[1]')
        answ = [i.text for i in answ]

        last_answ = answ[-1].replace('\n', '')
        answ = answ[:-1]

        a = list(range(len(answ)))
        answ_idx = list(filter(lambda x: x % 2 == 1, a))

        answ = [answ[i].replace('\n', '') for i in answ_idx]
        answ.append(last_answ)

        srcs = [f"{url}/{i}" for i in range(1, (len(ques)+1))]

        data_dict = { "question": ques, "answer":answ,"source": srcs}

        temp_df = pd.DataFrame(columns=[ "question", "answer","source"])

        faq_df = pd.concat([faq_df, pd.DataFrame(data=data_dict)])

        self.__handleOutput(output_file_name,faq_df)
        driver.close()
    
    #YÖK
    def yok_faq(self,output_file_name):
        faq_df = pd.DataFrame(columns=[ "question", "answer","source"])

        driver = webdriver.Chrome(options= self.options)

        url = self.__config["urls"]["yok"]

        driver.get(url)

        current_page = driver.find_element(By.XPATH, '//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[1]')
        next_page = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/a[text() = "2"]')

        current_page_number = current_page.text

        def find_more_button():
            more_button_alt1 = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/a[5]')
            more_button_alt2 = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/a[6]')
            
            more_button = None

            if (len(more_button_alt1)>0 and more_button_alt1[0].text == "...") or (len(more_button_alt2)>0 and more_button_alt2[0].text == "...") :
                
                if len(more_button_alt2)>0:
                    more_button = more_button_alt2[0]
                else:
                    more_button = more_button_alt1[0]
                
                # print(more_button.text)
            
            return more_button
        
        num_pages = 38

        while(True):

            texts = driver.find_elements(By.XPATH, '//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div')
            texts = [i.text for i in texts]
            a = list(range(len(texts)))
            ques_idx = list(filter(lambda x: x % 2 == 0, a))
            answ_idx = list(filter(lambda x: x % 2 == 1, a))
            ques = [texts[i].replace('\n', ' ') for i in ques_idx]
            answ = [texts[i].replace('\n', '') for i in answ_idx]
            
            
            current_page = driver.find_element(By.XPATH, '//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[1]')
            current_page_number = int(current_page.text)
            
            srcs = [f"https://www.yok.gov.tr/iletisim/sss/{current_page_number}/{i}" for i in range(1, (len(ques)+1))]

            data_dict = { "question": ques, "answer":answ,"source": srcs}
            
            temp_df = pd.DataFrame(columns=[ "question", "answer","source"])
            
            faq_df = pd.concat([faq_df, pd.DataFrame(data=data_dict)])
            
            
            if current_page_number == num_pages:
                break
            
            if current_page_number%5!=0:
                next_page = driver.find_elements(By.XPATH, f'//body[1]/form[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/a[text() = "{current_page_number+1}"]')
                next_page[0].click()
            else:
                more_button = find_more_button()
                more_button.click()


        self.__handleOutput(output_file_name,faq_df)

        driver.close()

    #VİTAMİN
    def vitamin_faq(self,output_file_name):
        
        concepts = list()
        descriptions = list()


        driver = webdriver.Chrome(options=self.options)

        url = self.__config["urls"]["vitamin"]

        driver.get(url)

                
        #Scrapping Concepts Vitamin-LGS
        concept_divs_lgs = driver.find_elements(By.XPATH, '/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]//div[@class="accordion"]')

        for i in concept_divs_lgs:
            concepts.append(i.get_attribute("textContent").split(") ")[1]) # Splitting question with question number using ") " pattern. (Ex: "1) Vitamin LGS nedir?") 

        #Scrapping Concepts Vitamin-Kitap
        concept_divs_kitap = driver.find_elements(By.XPATH,'/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]//div[@class="accordion"]')

        for i in concept_divs_kitap:
            concepts.append(i.get_attribute("textContent").split(") ")[1]) # Splitting question with question number using ") " pattern. (Ex: "1) Vitamin LGS nedir?")

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


        faq_df = pd.DataFrame({"question":concepts,"answer":descriptions,"source":url})


        self.__handleOutput(output_file_name,faq_df)

        driver.close()

    #VCLOUD
    def vcloud_faq(self,output_file_name):
        concepts = list()
        descriptions = list()

        driver = webdriver.Chrome(options=self.options)

        url = self.__config["urls"]["vcloud"]

        driver.get(url)

        container = driver.find_element(By.XPATH,'/html[1]/body[1]/div[2]/section[2]/div[1]/div[1]/div[1]/div[1]/div[1]')

        #Scrapping Concepts

        titles = container.find_elements(By.XPATH,'div[@class="acctitle"]')

        for title in titles:
            concepts.append(title.get_attribute("textContent"))

        #Scrapping Descriptions

        contents = container.find_elements(By.XPATH,'div[@class="acc_content clearfix"]')

        for content in contents:
            descriptions.append(content.get_attribute("textContent"))

        faq_df = pd.DataFrame({"question":concepts,"answer":descriptions,"source":url})
        
        self.__handleOutput(output_file_name,faq_df)

        driver.close()

    #RAUNT
    def raunt_faq(self,output_file_name):
        concepts = list()
        descriptions = list()

        driver = webdriver.Chrome(options=self.options)

        url = self.__config["urls"]["raunt"]

        driver.get(url)

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



        faq_df = pd.DataFrame({"question":concepts,"answer":descriptions,"source":url})

        self.__handleOutput(output_file_name,faq_df)
        driver.close()

    #HIZLIGO
    def hizligo_faq(self,output_file_name):   
        concepts = list()
        descriptions = list()

        driver = webdriver.Chrome(options=self.options)

        url = self.__config["urls"]["hizligo"]

        driver.get(url)

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


        faq_df = pd.DataFrame({"question":concepts,"answer":descriptions,"source":url})

        self.__handleOutput(output_file_name,faq_df)

        driver.close()

    #EBA
    def eba_faq(self,output_file_name):
        concepts = list()
        descriptions = list()
 
        driver = webdriver.Chrome()
 
        concepts = list()
        descriptions = list()
 
        # base_url = "https://ders.eba.gov.tr/yardim-sss/"
        base_url = self.__config["urls"]["eba"]
 
        driver.get(base_url)
 
        wait = WebDriverWait(driver, 10)  # Adjust the timeout (10 seconds in this example)
 
        all_links = driver.find_elements(By.XPATH,'/html[1]/body[1]/section[6]//div[@class="search-datas"]')
        all_urls = [i.get_attribute("link") for i in all_links]
 
        print("all_urls:",all_urls)
 
        #Ogrenci Eba
        for link_url in all_urls[:41]:
 
            #Skip PDF
            if link_url == None:
                continue
 
            direct_url = base_url +"/"+link_url
 
            driver.get(direct_url)
            container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")
 
 
            concepts.append(container[1].text)
            descriptions.append(container[2].text)
 
            driver.back()
 
 
        for link_url in all_urls[80:170]:
 
            #Skip PDF
            if link_url == None:
                continue
 
            direct_url = base_url +"/"+link_url
 
            driver.get(direct_url)
            container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")
 
 
            concepts.append(container[1].text)
            descriptions.append(container[2].text)
 
            driver.back()
 
 
        for link_url in all_urls[219:len(all_urls)]:
 
            #Skip PDF
            if link_url == None:
                continue
 
            direct_url = base_url +"/"+link_url
 
            driver.get(direct_url)
            container = driver.find_elements(By.XPATH,"/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/*")
 
 
            concepts.append(container[1].text)
            descriptions.append(container[2].text)
 
            driver.back()
 
        faq_df = pd.DataFrame({"question":concepts,"answer":descriptions,"source":base_url})
 
        self.__handleOutput(output_file_name,faq_df)
 
        driver.close()
    
    def scrapAll(self):
        self.scrapJustSebit()
        self.scrapJustEdu()
    
    def scrapJustSebit(self):
        self.eba_faq("eba.csv")
        self.hizligo_faq("hizligo.csv")
        self.raunt_faq("raunt.csv")
        self.vitamin_faq("vitamin.csv")
        self.vcloud_faq("vcloud.csv")

    def scrapJustEdu(self):
        self.meb_faq("meb.csv")
        self.osym_faq("osym.csv")
        self.yok_faq("yok.csv")
    
    def concatMultipleCsv(self,input_path,output_path):
        csv_file_paths = list()

        for filename in os.listdir(input_path):
            last_path = os.path.join(input_path,filename)
            csv_file_paths.append(last_path)

        df = pd.concat(map(pd.read_csv,csv_file_paths))

        seperate_paths = output_path.split("/")

        filename = seperate_paths.pop()
        
        dir_path = os.path.join(*seperate_paths)
        if (not os.path.exists(dir_path)):
            os.mkdir(dir_path)

        output_path = os.path.join(dir_path,filename)

        df.to_csv(output_path,index=False)





        




