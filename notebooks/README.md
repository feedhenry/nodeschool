# Notebooks

We have provided a dockerfile that contains ijs configured for node 6 against jupoter notebook.
This is for quickly presenting the trickier parts of Java Script, with environment that is nicer,
than the usuall nodejs repl.

```
cd notebooks
docker build -t ijs-0 .
docker run -v `pwd`:/home/jovyan/work -it --rm -p 8888:8888 ijs-0
```

We are using:
* https://jupyter.readthedocs.io/en/latest/index.html
* http://n-riesco.github.io/ijavascript/

