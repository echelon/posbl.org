"""
I'm writing a quick and dirty parser to extract PDB coordinates 
and output them as a Javascript array.
"""

import re

def parse(inFile, outFile):
	# Open and Parse
	f = open(inFile, 'r')
	space = re.compile('\s+')
	atoms = []
	for ln in f:
		if ln[0:4] != 'ATOM':
			continue
		line = space.split(ln)
		coords = line[6:9]
		atom = line[11]

		atoms.extend(coords)
		atoms.extend(atom)

	# Output for Javascript
	s = "var ATOMS = [\n"
	for i in range(len(atoms)/4):
		o = (float(atoms[4*i]),
			 float(atoms[4*i+1]),
			 float(atoms[4*i+2]),
			 atoms[4*i+3])
		s += "\t%f, %f, %f, '%s',\n" % o

	s += "];"

	f = open(outFile, 'w')
	f.write(s)
	print "Done"

if __name__ == '__main__':
	parse('./2KE6.pdb', 'out.js')
