#!/usr/bin/env python
import random
import urllib.request
import subprocess

# Open the file from the URL
with urllib.request.urlopen("https://gist.githubusercontent.com/alexanderwassberg/4614feaf1258c11bec7170ece37db610/raw/b6d68a8f26563cd6b237e67fdc4774887b147ed2/words.txt") as f:
    # Read the contents of the URL
    data = f.read().decode()

words = data.split("\n")

listA, listB = [], []

for word in words:

  split_word = word.split("-")

  if len(split_word) == 2:
    listA.append(split_word[0])
    listB.append(split_word[1])


if listA and listB:
  # Choose a random index into each list
  indexA = random.randint(0, len(listA) - 1)
  indexB = random.randint(0, len(listB) - 1)

  # Select the strings at the chosen indices
  wordA = listA[indexA]
  wordB = listB[indexB]

  # Concatenate the strings
  combined_string = wordA + "-" + wordB

  print(combined_string.capitalize())

  #subprocess.run(["figlet", combined_string])

else:
  print("Lists are empty")
