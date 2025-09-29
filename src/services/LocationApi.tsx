export async function fetchCountries(): Promise<string[]> {
  const res = await fetch("http://localhost:5089/api/Location/countries");
  if (!res.ok) throw new Error("Error fetching countries from backend");
  const data = await res.json();
  return data;
}

export async function fetchLanguages(): Promise<string[]> {
  const res = await fetch("http://localhost:5089/api/Location/languages");
  if (!res.ok) throw new Error("Error fetching languages from backend");
  const data = await res.json();
  return data; 
}
