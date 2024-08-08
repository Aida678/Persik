import requests
from bs4 import BeautifulSoup
import json


def scrape_questions():
    url = 'https://en-ege.sdamgia.ru/test?theme=89'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    questions = []

    # print(soup.find_all('div', class_='prob_maindiv'))
    # Найдем все вопросы на странице
    for question_block in soup.find_all('div', class_='prob_maindiv'):
        # question_text = question_block.find('span', class_='prob_maindiv_text').text.strip()
        # print(question_block.find('div', class_='probtext').text.strip().replace('\xa0', '\n'))
        # print(question_block)
        question_text = question_block.find('div', class_='probtext').get_text(strip=True)

        answer_options = []
        for option in question_block.find_all('p', class_='left_margin'):
            text = option.get_text(strip=True)
            if text and text[0].isdigit():  # only consider options that start with a digit
                answer_options.append(text)

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
