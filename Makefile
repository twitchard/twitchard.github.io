index.html: README.md
	pandoc -s --toc -o docs.html README.md
