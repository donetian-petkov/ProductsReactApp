export default async function fetchPermissions() {
    let response = await fetch('./permissions')
    let result = await response.json();

    return Object.values(result)[0];

}