export async function getPokemons () {
    const response = await fetch ('https://reactmarathon-api.netlify.app/api/pokemons');
    const body = await response.json();

    return body;
}

export async function getDamage (player1ID, player1AttackID, player2ID) {
    const response = await fetch (`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1ID}&attackId=${player1AttackID}&player2id=${player2ID}`);
    const body = await response.json();

    return body;
}