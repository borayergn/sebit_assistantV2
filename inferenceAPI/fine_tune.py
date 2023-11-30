from model import Model
from transformers import TrainingArguments
from peft import PeftConfig
import re
import os
import pandas as pd

class FineTune(Model):
    def __init__(self, model, tokenizer):
        super().__init__(model, tokenizer)
    
        self.__template = "tag"
        self.__training_args = TrainingArguments()
        self.__dataset = None
        self.__peft_config = PeftConfig()

    #SETTERS
    #---------------

    #hash or tag
    def setTemplate(self,templateType):
        self.__template = templateType
    
    def setTrainingArgs(self,*args):
        self.__training_args = TrainingArguments(args)

    def setPeftConfig(self,*args):
        self.__peft_config = PeftConfig(args)

    def setDataset(self,dataset_):
        self.__dataset = dataset_ 

    
    #GETTERS
    #---------------

    def getTemplate(self,templateType):
        return(self.__template) 
    
    def getTrainingArgs(self,*args):
        return(self.__training_args) 

    def getPeftConfig(self,*args):
        return(self.__peft_config) 

    def getDataset(self,dataset_):
        return(self.__dataset) 
    
    def prepareData(self,input_folder,output_path,system_prompt = " "):
        directory = "webScrapper/step2(education)"

        csv_file_paths = list()

        for filename in os.listdir(directory):
            last_path = os.path.join(directory,filename)
            csv_file_paths.append(last_path)
        
        df = pd.concat(map(pd.read_csv,csv_file_paths))

        df = df.dropna()

        system_message = system_prompt

        df["system_message"] = system_message

        if self.__template == "hash":
            df["text"] = " ###System: "+df["system_message"]+" ###User: " + df["concept"] + " ###Assistant: " + df["description"]
        elif self.__template =="tag":
            df["text"] = "<s>[INST]"+"<<SYS>>"+df["system_message"]+"<</SYS>>"+df["concept"]+"[/INST]"+" "+df["description"]+"</s>"

        full_text = df["text"]
        
    

        