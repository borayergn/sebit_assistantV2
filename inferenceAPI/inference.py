from model import Model
import requests

class Inference(Model):

    def __new__(cls, model, tokenizer,api_key):
        response = requests.get("http://127.0.0.1:8000/key/authenticate_key",headers={"Api-Key":api_key})
        content = response.json()
    
        if not content["Authenticated"]:
            return None
        else:
            return super().__new__(cls)
        
    def __init__(self, model, tokenizer,api_key):

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

        return(content["output"])
    
    def predictWithDocuments(self,prompt):
        pass
        

