import requests
from bs4 import BeautifulSoup
import json
import re


def scrape_questions():
    url = 'https://en-ege.sdamgia.ru/test?theme=89'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    questions = []

    for question_block in soup.find_all('div', class_='prob_maindiv'):
        probtext = question_block.find('div', class_='probtext')

        if probtext:
            question_text = probtext.get_text().split('\xa0', 1)
            if len(question_text) > 1:
                question_text[1] = question_text[1].replace('\xa0', ' ')
                question_text[1] = re.sub(r'\d+\u202f', '', question_text[1])
        else:
            continue


        answer_options = []
        for option in question_block.find_all('p', class_='left_margin'):
            text = option.get_text(strip=True)
            if text and text[0].isdigit():
                split_text = re.split(r'\d\)\s+', text)[1::]
                # break
                answer_options = [word for word in split_text]
                break

        if len(answer_options) == 4:
            questions.append({
                'question': question_text,
                'answers': answer_options
            })

    # Сохраним вопросы в файл
    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=4)

    return questions


if __name__ == "__main__":
    scrape_questions()
