const rootUrl = 'http://localhost:3001';
export async function getData(mod) {
    const res = await fetch(`${rootUrl}/${mod}`);
    return await res.json();
}

export function updateData(mod, data) {
    return fetch();
}