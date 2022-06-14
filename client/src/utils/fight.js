import { controls } from '../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const firstFighterHealthBar = document.querySelector('#left-fighter-indicator');
    const secondFighterHealthBar = document.querySelector('#right-fighter-indicator');

    firstFighterHealthBar.style.width = '100%';
    secondFighterHealthBar.style.width = '100%';

    const fightData = {
      [firstFighter.id]: {
        blocked: false,
        health: firstFighter.health,
        attack: firstFighter.power,
        attackPressed: false,
        criticalHit: [],
        criticalHitDone: false
      },
      [secondFighter.id]: {
        blocked: false,
        health: secondFighter.health,
        attack: secondFighter.power,
        attackPressed: false,
        criticalHit: [],
        criticalHitDone: false
      },
      log: []
    };

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case controls.PlayerOneAttack:
          attackHandler(firstFighter, secondFighter);
          break;
        case controls.PlayerOneBlock:
          fightData[firstFighter.id].blocked = true;
          break;
        case controls.PlayerTwoAttack:
          attackHandler(secondFighter, firstFighter);
          break;
        case controls.PlayerTwoBlock:
          fightData[secondFighter.id].blocked = true;
          break;
        case controls.PlayerOneCriticalHitCombination[0]:
        case controls.PlayerOneCriticalHitCombination[1]:
        case controls.PlayerOneCriticalHitCombination[2]:
          criticalAttackHandler(firstFighter, secondFighter, e.code);
          break;
        case controls.PlayerTwoCriticalHitCombination[0]:
        case controls.PlayerTwoCriticalHitCombination[1]:
        case controls.PlayerTwoCriticalHitCombination[2]:
          criticalAttackHandler(secondFighter, firstFighter, e.code);
          break;
      }

      if (Object.values(fightData).filter((item) => item.health <= 0).length) {
        const winner = fightData[firstFighter.id].health <= 0 ? secondFighter : firstFighter;
        return resolve({...fightData, winner: winner.name});
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case controls.PlayerOneAttack:
          fightData[firstFighter.id].attackPressed = false;
          break;
        case controls.PlayerTwoAttack:
          fightData[secondFighter.id].attackPressed = false;
          break;
        case controls.PlayerOneBlock:
          fightData[firstFighter.id].blocked = false;
          break;
        case controls.PlayerTwoBlock:
          fightData[secondFighter.id].blocked = false;
          break;
        case controls.PlayerOneCriticalHitCombination[0]:
        case controls.PlayerOneCriticalHitCombination[1]:
        case controls.PlayerOneCriticalHitCombination[2]:
          fightData[firstFighter.id].criticalHit = [];
          break;
        case controls.PlayerTwoCriticalHitCombination[0]:
        case controls.PlayerTwoCriticalHitCombination[1]:
        case controls.PlayerTwoCriticalHitCombination[2]:
          fightData[secondFighter.id].criticalHit = [];
          break;
      }
    });

    function attackHandler(attacker, defender) {
      const { id: attackerId } = attacker;
      const { id: defenderId } = defender;

      const { attackPressed, blocked: attackerBlocked } = fightData[attackerId];
      const { blocked: defenderBlocked } = fightData[defenderId];

      if (!attackPressed && !attackerBlocked && !defenderBlocked) {
        const damage = getDamage(attacker, defender);
        fightData[defenderId].health -= damage;
        fightData[attackerId].attackPressed = true;
        const firstFighterAtacked = attacker.id === firstFighter.id;
        fightData.log = [... fightData.log,  {
          fighter1Shot: firstFighterAtacked ? damage : 0,
          fighter2Shot: !firstFighterAtacked ? damage : 0,
          fighter1Health: fightData[firstFighter.id].health,
          fighter2Health: fightData[secondFighter.id].health,
        }];
        healthBarHandler();
      }
    }

    function criticalAttackHandler(attacker, defender, keyCode) {
      const { id: attackerId } = attacker;
      const { id: defenderId } = defender;

      if (!fightData[attackerId].criticalHit.includes(keyCode)) {
        fightData[attackerId].criticalHit = [...fightData[attackerId].criticalHit, keyCode];
      }
      if (
        fightData[attackerId].criticalHit.length === 3 &&
        !fightData[attackerId].criticalHitDone &&
        !fightData[attackerId].blocked
      ) {
        fightData[defenderId].health -= fightData[attackerId].attack * 2;
        healthBarHandler();
        fightData[attackerId].criticalHit = [];
        fightData[attackerId].criticalHitDone = true;
        const firstFighterAtacked = attacker.id === firstFighter.id;
        fightData.log = [... fightData.log,  {
          fighter1Shot: firstFighterAtacked ?  fightData[attackerId].attack * 2 : 0,
          fighter2Shot: !firstFighterAtacked ? fightData[attackerId].attack * 2 : 0,
          fighter1Health: fightData[firstFighter.id].health,
          fighter2Health: fightData[secondFighter.id].health,
        }];
        setTimeout(() => {
          fightData[attackerId].criticalHitDone = false;
          fightData[attackerId].criticalHit = [];
        }, 10000);
      }
    }

    function healthBarHandler() {
      firstFighterHealthBar.style.width =
        fightData[firstFighter.id].health > 0
          ? `${(fightData[firstFighter.id].health / firstFighter.health) * 100}%`
          : 0;
      secondFighterHealthBar.style.width =
        fightData[secondFighter.id].health > 0
          ? `${(fightData[secondFighter.id].health / secondFighter.health) * 100}%`
          : 0;
    }
  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  const { power } = fighter;
  const criticalHitChance = Math.random() + 1;
  return power * criticalHitChance;
}

export function getBlockPower(fighter) {
  const { defense } = fighter;
  const criticalHitChance = Math.random() + 1;
  return defense * criticalHitChance;
}
