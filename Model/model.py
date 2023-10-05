from transformers import AutoModelForCausalLM, AutoTokenizer
from torch.nn import DataParallel
from peft import AutoPeftModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("llama2SA")
model = AutoPeftModelForCausalLM.from_pretrained("llama2SA")