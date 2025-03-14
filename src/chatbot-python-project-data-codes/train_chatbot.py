import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import json
import pickle
import numpy as np
import random
import os
from nltk.corpus import stopwords

# Import the classifier from the shared module
from classifier import SimpleClassifier

words=[]
classes = []
documents = []
ignore_words = ['?', '!']
data_file = open('intents.json').read()
intents = json.loads(data_file)

print("Loading intents...")
for intent in intents['intents']:
    print(f"\nIntent: {intent['tag']}")
    print("Patterns:", intent['patterns'])
    for pattern in intent['patterns']:
        # Tokenize and clean pattern
        w = nltk.word_tokenize(pattern.lower())
        w = [word for word in w if word.isalnum()]  # Remove punctuation
        words.extend(w)
        documents.append((w, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

print("\nProcessed patterns:", documents)

# lemmaztize and lower each word and remove duplicates
words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words]
words = sorted(list(set(words)))
# sort classes
classes = sorted(list(set(classes)))
# documents = combination between patterns and intents
print (len(documents), "documents")
# classes = intents
print (len(classes), "classes", classes)
# words = all words, vocabulary
print (len(words), "unique lemmatized words", words)

# Add these archaeological specific words to your words list
archaeological_terms = [
    'artifact', 'excavation', 'archaeology', 'heritage', 'ancient',
    'chola', 'pallava', 'pandya', 'temple', 'inscription', 'bronze',
    'manuscript', 'tamil', 'kalanjiyam', 'museum', 'historical'
]
words.extend(archaeological_terms)

pickle.dump(words,open('words.pkl','wb'))
pickle.dump(classes,open('classes.pkl','wb'))

# create our training data
training = []
# create an empty array for our output
output_empty = [0] * len(classes)

# training set, bag of words for each sentence
for doc in documents:
    # initialize our bag of words
    bag = []
    # list of tokenized words for the pattern
    pattern_words = doc[0]
    # lemmatize each word - create base word, in attempt to represent related words
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]
    # create our bag of words array with 1, if word match found in current pattern
    for w in words:
        bag.append(1) if w in pattern_words else bag.append(0)
    
    # output is a '0' for each tag and '1' for current tag (for each pattern)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    
    training.append([bag, output_row])

# shuffle our features and turn into np.array
random.shuffle(training)
training = np.array(training, dtype=object)

# create train and test lists. X - patterns, Y - intents
train_x = list(training[:,0])
train_y = list(training[:,1])
print("Training data created")

# Use our simple classifier
model = SimpleClassifier()
model.classes = classes
model.words = words
model.fit(train_x, train_y)

# Save model using pickle
pickle.dump(model, open('chatbot_model.pkl', 'wb'))
print("Model created and saved using SimpleClassifier")
