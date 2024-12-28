# Planning

## DB design

```mermaid
---
title: RockPaperWizard
---
erDiagram
Games ||--o{ Rounds : has
Games {
    int game_id  PK
    timestamp created_at
    timestamp updated_at
    timestamp deleted_at
    string password
    string player_1
    string player_2
    string player_3
    string player_4
    string player_5
    string player_6
    string round_starter
    int player_1_gold
    int player_2_gold
    int player_3_gold
    int player_4_gold
    int player_5_gold
    int player_6_gold
}
Rounds {
    int game_id FK, PK
    int round PK
    string player1_move_id
    string player2_move_id
    string player3_move_id
    string player4_move_id
    string player5_move_id
    string player6_move_id
    string player1_target
    string player2_target
    string player3_target
    string player4_target
    string player5_target
    string player6_target
    string player1_position
    string player2_position
    string player3_position
    string player4_position
    string player5_position
    string player6_position
}
```

### Create a New Game

This will happen when user creates a new game.

- enhancement todo: If I dont plan on letting users sign up
  - I need to figure out a way to restrict game creation and perhaps joining based on IP address
- validate playername
- validate password
- validate number_of_players between 2 and 6
- generate a new game_id
- add created_at timestamp
- add updated_at timestamp
- add password
- add player_1 name
- add number_of_players
- based on number of players, set non need player columns to null
- set all player gold to 0

### Client side

-

### Join a Game

This will happen when user joins a game.

- enhancement todo: Same as in game creation, might need to do a IP check

### Start Game

- Setup Round 1
