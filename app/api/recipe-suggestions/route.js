import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('Request received'); // Log to verify the request is reaching the handler

    const { items } = await request.json();
    console.log('Items:', items); // Log the items to ensure they are received correctly

    const ingredients = items.join(',');
    console.log('Formatted Ingredients:', ingredients); // Log the formatted ingredients

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    console.log('API response status:', response.status); // Log the status code of the response
    const data = await response.json();

    console.log('API response data:', data); // Log the actual data received

    if (data.meals) {
      return NextResponse.json({ recipes: data.meals });
    } else {
      return NextResponse.json({ error: 'No recipes found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to fetch recipe suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe suggestions' }, { status: 500 });
  }
}
