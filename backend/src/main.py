from langchain import hub
from langchain.chains import LLMChain
from langchain.prompts import ChatPromptTemplate
from langchain.llms import Ollama
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import StrOutputParser
from lanarky import LangchainRouter

from fastapi import FastAPI


app = FastAPI()

QA_CHAIN_PROMPT = hub.pull("rlm/rag-prompt-llama")
llm = Ollama(
    model="llama2",
    verbose=True,
    callback_manager=CallbackManager([StreamingStdOutCallbackHandler()]),
)
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a very good tarot reader. You like to give short answers"),
        ("human", "{question}"),
    ]
)
chain = LLMChain(llm=llm, prompt=prompt, output_parser=StrOutputParser())

langchain_router = LangchainRouter(
    langchain_url="/chat",
    langchain_object=chain,
    streaming_mode=0
)

app.include_router(langchain_router)
