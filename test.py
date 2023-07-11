letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
           "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
points = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1,
          3, 4, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10]

letter_to_points = {key: value for key, value in zip(letters, points)}

letter_to_points[" "] = 0


def score_word(word):
    point_total = 0
    for char in word:
        point_total += letter_to_points[char]
    return point_total


brownie_points = score_word("BROWNIE")

print(brownie_points)

player_to_words = {
    "BLUE": ['EARTH', 'ERASER', 'ZAP'],
    "TENNIS": ['EYES', 'BELLY', 'COMA'],
    "EXIT": ['MACHINE', "HUSKY", 'PERIOD']
}

player_to_points = {}

for item in player_to_words.keys():
    player_points = 0
    player_to_points[item] = 0
    for play in player_to_words.get(item):
        player_points += score_word(play)
        player_to_points[item] += player_points

print(player_to_points)

input('tttt')