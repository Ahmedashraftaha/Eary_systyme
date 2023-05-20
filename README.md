## Eary System (35 Points)
project called "Eary", which help people to check their hearing problems.
_______________________________________________________________________
## Requirements: 
• When the admin logs in, he creates a few questions with several possible responses for each. 
There is only one valid response for each question.
• After registering with the system, users cannot log in until the admin approve their account.
• Users are allowed to retake the hearing assistant exam as many as they want. The user must 
first listen to the audio recording for the multiple-choice questions before choosing the 
appropriate answer.
• The user displays his or her exam result after completion.
• The user may also see a history of the exams he has previously taken.
_______________________________________________________________________
## In this system we have 2 types of users:
1. Admin User: 
• Feature Including:
• Login/ Logout (3 Points).
• Update Profile (3 Points).
• Manage other users accounts (CRUD) (3 Points).
• Manage hearing assistance questions (CRUD) (3 Points).
• Manage answers for each question (CRUD) (3 Points).
2. Normal User:
• Feature Including:
• Login/ Logout. (3 Points)
• Register. (3 Points)
• Update profile (3 Points)
• Take the hearing assistance exam. (3 Points)
• Show history of Exams. (3 Points)
_______________________________________________________________________
## Database Models:
# • User model consists of:
o (Name, Email, Password, Phone, Status (active, in-active), Type (admin, normal)).
# • Hearing assistance Exam model consist of:
o (Name, Question, Audio File, statue(active, in-active).
# • Exam Question model has many Responses, and each response consist of:
o (Text, priority)
_______________________________________________________________________
• Every team member will be questioned regarding any front- or backend-related matter. (5 Points)
• Backend should be in (node.js & Express.js) and the backend should be in React.js.
• Using Git in this project by team members will be bonus.
