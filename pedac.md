so what i need to do is somehow find out all of the urls being tested
then use each url to get how many passed/failed

ok now i have a list of two urls

so basically i need to 
- create a method where i input the region to do the count queries 
- then get an object to place the urls in 
- make a for loop for the amount of urls 
- in each make a call for the successes and failures this is placed in OK and error
- return this object which is now the formatted calls

ok this is done now good job Jake!!

ok so i need to figure out how to make a sql query for 

- first count the records to see if there are more than 10,000 rows, if so do logic else just get the rows 
- the sql query in order to get the same amount of data everytime should look something like this
  - first take the amount of available rows and the first and last time stamps

- basically i need to take the current aggtest function and place it in the utils of the frontend
- i need to create another function that iterates through the regions in data as rawData props
- then save the formated data to the calls property in the use effect function
