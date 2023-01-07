#!/usr/bin/env python
import random
import urllib.request

# Open the file from the URL
with urllib.request.urlopen("https://raw.githubusercontent.com/alexanderwassberg/ordflaket/master/words.txt") as f:
    # Read the contents of the file
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

else:
  print("Lists are empty")
