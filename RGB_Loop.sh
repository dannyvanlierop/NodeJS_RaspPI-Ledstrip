#!/bin/bash

eval loops=1;
eval r=0;
eval g=0;
eval b=0;

eval rgbstep=254;

eval rgbmin=1;
	rgbmin=$[$rgbmin+$rgbstep];
	
eval rgbmax=254;
	rgbmax=$[$rgbmax-$rgbstep];


#	eval rgbmin=253;
#	eval rgbmax=253;

/usr/local/bin/pigs p 17 0;
/usr/local/bin/pigs p 22 0;
/usr/local/bin/pigs p 24 0;

if [[ $1 -ne 0 ]]
then
  loops=$1; 
fi

if [[ $2 -ne 0 ]]
then
  rgbstep=$2; 
fi

while [[ $loops -ne 0 ]]; do

	echo "Loop: $loops";

	while [ "$r" -lt "$rgbmax" ]; do r=$[$r+$rgbstep];
		
		if [[ $r -gt $rgbmax ]]; then r=$rgbmax; fi
		/usr/local/bin/pigs p 17 "$r"; echo "r=$r";

	done; 

	while [ "$r" -gt "$rgbmin" ]; do r=$[$r-$rgbstep];
	
		if [[ $r -lt $rgbmin ]]; then r=$rgbmin; fi	
		/usr/local/bin/pigs p 17 "$r";  echo "r=$r";
	done;
	
	while [ "$g" -lt "$rgbmax" ]; do g=$[$g+$rgbstep];
		
		if [[ $g -gt $rgbmax ]]; then g=$rgbmax; fi
		/usr/local/bin/pigs p 22 "$g"; echo "g=$g";

	done; 

	while [ "$g" -gt "$rgbmin" ]; do g=$[$g-$rgbstep];
	
		if [[ $g -lt $rgbmin ]]; then g=$rgbmin; fi	
		/usr/local/bin/pigs p 22 "$g";  echo "g=$g";
	done;
	
	while [ "$b" -lt "$rgbmax" ]; do b=$[$b+$rgbstep];
		
		if [[ $b -gt $rgbmax ]]; then b=$rgbmax; fi
		/usr/local/bin/pigs p 24 "$b"; echo "b=$b";

	done; 

	while [ "$b" -gt "$rgbmin" ]; do b=$[$b-$rgbstep];
	
		if [[ $b -lt $rgbmin ]]; then b=$rgbmin; fi	
		/usr/local/bin/pigs p 24 "$b";  echo "b=$b";
	done;

	loops=$[$loops-1];
	
done;
