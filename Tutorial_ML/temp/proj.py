import os
import codecs

infile='tag'
outfile='out.txt'

def createDir(outline):
    if not os.path.exists(os.getcwd() + '\\' + outline):
        os.mkdir(os.getcwd() + '\\' + outline)

with open(infile,'r+', encoding='utf8') as input, open(outfile,"w",encoding='utf8') as output:
    next(input)
    for line in input:
        elements = [str.strip(x) for x in line.split(',')]
        outline = u'[{0}]｜[{1}P]｜{2}｜[01-{3}]'.format(*elements)
        output.write(outline)
        createDir(outline)

with open('out.txt','r',-1,'utf8') as results:
    for row in results:
        print(row + '\n')