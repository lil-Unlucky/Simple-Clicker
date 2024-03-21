// BUTTONS
var click_btn = document.querySelector('.click__button'); // Кнопка Клика
var upgrade_btn = document.querySelector('.upgrade__button'); // Кнопка улучшения уровня
var auto_clicker = document.querySelector('.auto_clicker_up'); // Кнопка покупки авто кликера
var auto_clicker_upgrade_level = document.querySelector('.auto_clicker_upgrade_level'); // Переменная события улучшения авто кликера
var auto_clicker_name = document.querySelector('.clicker_name'); // Просто нужно
// UI TEXT
var points_count = document.querySelector('.point_count'); // Переменная отвечающая за вывод - счетчика points (очков)
var upgrade_count = document.querySelector('.upgrade_count'); // Переменная отвечающая за вывод - счетчика уровня
var auto_click_cost_txt = document.querySelector('.auto_clicker_cost_up'); // Переменная вывода цены авто кликера в верстку
var auto_clicker_cost_level_up_txt = document.querySelector('.auto_clicker_cost_up_level'); // Переменная отвечающая за вывод стоимости улучшения авто кликера в верстку
var auto_clicker_level_info = document.querySelector('.auto_clicker_level');
var auto_clicker_click_per_time_info = document.querySelector('.auto_clicker_click_per_time');
// INNER GENERAL VARIABLES
let points = 0;
let level = 0;
let click_power = 1;
let next_level_points = 30;
let cost = 0;
// INNER GENERAL VARIABLES -> SPECIAL UPGRADES
// INNER GENERAL VARIABLES -> SPECIAL UPGRADES --> AUTO-CLICKER
let auto_clicker_cost = 2500;
let auto_clicker_upgrade = false;

let auto_click_level = 1;
let auto_clicker_upgrade_cost = 1500;
let auto_clicker_time_delay = 1000;
let auto_clicker_poins_per_delay = 1;

// GAME -> CHECK
if (auto_clicker_upgrade == false) {
    auto_click_cost_txt.innerHTML = auto_clicker_cost;
    auto_clicker_cost_level_up_txt.innerHTML = 'Not available';
}

// GAME -> FUNCTIONS
function upgrade_event() { // Функция улучшения
    if(points >= next_level_points) {
        click_power += 1;
        points -= next_level_points;
        next_level_points = Math.floor((next_level_points * 4) / 2);
    } else alert(`
    Not enough points!
    Needs: ${next_level_points}.
    `);
}

function auto_clicker_stats_update() {
    auto_clicker_level_info.innerHTML = auto_click_level;
    auto_clicker_click_per_time_info.innerHTML = auto_clicker_poins_per_delay;
}

function auto_clicker_level_up() {
    points -= auto_clicker_upgrade_cost;
    auto_click_level += 1;
    auto_clicker_upgrade_cost += 1500;
    auto_clicker_cost_level_up_txt.innerHTML = auto_clicker_upgrade_cost;
    auto_clicker_stats_update();
}

// GAME LOGIC
click_btn.addEventListener('click', () => {
    points += click_power;

    points_count.innerHTML = points;
})

upgrade_btn.addEventListener('click', () => {
    upgrade_event();
    level += 1;

    upgrade_count.innerHTML = level;
})

// SEPARATOR ---- *SPECIAL*
// AUTO-CLICKER -> TIMER
let auto_cliker_event = setInterval(() => {
    if (auto_clicker_upgrade == true) {
        points += auto_clicker_poins_per_delay;
        points_count.innerHTML = points; // Обновление points в верстке через каждые auto_clicker_time_delay
    }
}, auto_clicker_time_delay);

auto_clicker.addEventListener('click', () => {
    if (points >= auto_clicker_cost && auto_clicker_upgrade != true) {
        points -= auto_clicker_cost;
        auto_clicker_upgrade = true
        auto_clicker_cost_level_up_txt.innerHTML = auto_clicker_upgrade_cost;
        auto_clicker.classList.add('already_have');
    } else {
        alert(`
        Недостаточно очков!
        Требуется: ${auto_click_cost_txt.innerHTML}
        `);
    }
})

auto_clicker_upgrade_level.addEventListener('click', () => {
    if (points < auto_clicker_upgrade_cost && auto_clicker_upgrade != true) {
        alert(`
        Не выполнены следующие условия:
        1. Отсутствует основное улучшение: ${auto_clicker_name.innerHTML},
        2. Недостаточно очков, требуется: ${auto_clicker_upgrade_cost}
        `);
    } else if (auto_clicker_upgrade != true) {
        alert(`
        Сначала приобретите основное улучшение: ${auto_clicker_name.innerHTML},
        Стоимость улучшения: ${auto_click_cost_txt.innerHTML}.
        `)
    } else if (points < auto_clicker_upgrade_cost) {
        alert(`
        Недостаточно очков для улучшения!
        Требуется: ${auto_clicker_upgrade_cost}
        `);
    } else if (points >= auto_clicker_upgrade_cost && auto_clicker_upgrade != false) {
        auto_clicker_level_up();
        auto_clicker_stats_update();
        if (auto_click_level % 4 == 0) {
            auto_clicker_time_delay -= 100;
        }
        if (auto_click_level % 5 == 0) {
            auto_clicker_poins_per_delay += 1;
        }
    }
})