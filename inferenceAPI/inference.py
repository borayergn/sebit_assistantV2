from model import Model
import requests
import warnings

class Inference(Model):

    def __new__(cls,api_key, model = "LLama2-SA", tokenizer = "LLama2-SA"):
        response = requests.get("http://127.0.0.1:8000/key/authenticate_key",headers={"Api-Key":api_key}) #API key environment variable olmalı (güvenlik için)
        content = response.json()
    
        if not content["Authenticated"]:
            warnings.warn("Invalid API Key, None object will return.")
            return None
        else:
            return super().__new__(cls)
        
    def __init__(self,api_key, model = "LLama2-SA", tokenizer = "LLama2-SA"):

        super().__init__(model, tokenizer)


        # self.url_config = "http://172.17.45.102:8080/invoke"
        self.system_prompt = ""
        self.vectorDB = None
        self.__user_id = requests.get("http://127.0.0.1:8000/key/authenticate_key",headers={"Api-Key":api_key}).json()["User"]
    
    def getUser(self):
        return self.__user_id

    def setVectorDB(self,vectordb):
        self.vectorDB = vectordb

    def getVectorDB(self):
        return self.vectorDB
    
    def setSystemPrompt(self,sys_prompt):
        self.system_prompt = sys_prompt
    
    def getSystemPrompt(self):
        return self.system_prompt
    
    def __setUrlConfig(self,url):
        self.url_config = url
    
    def predict(self,prompt):

        prompt_data = {
            "input": {
                "query": prompt
                },
                "config": {},
                "kwargs": {} #self._args
            }
        
        response = requests.post("http://127.0.0.1:8000/key/invoke_key",json=prompt_data)
        
        content = response.json()

        return(content)
    
    def predictWithDocuments(self,prompt):
        pass
        

