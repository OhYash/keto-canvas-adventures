# How to Update the /now Page

## Quick Mobile Update (GitHub Web UI)

1. **On your phone or computer**, navigate to:
   https://github.com/OhYash/keto-canvas-adventures/blob/main/src/data/nowData.json

2. **Click the pencil icon** (Edit this file)

3. **Update the data**:
   - Modify existing items
   - Add new items to `currentPlans` array
   - Update `lastUpdated` dates
   - Add/remove links as needed

4. **Commit changes**:
   - Add a commit message like "Update now page - [date]"
   - Click "Commit changes"

5. **Auto-deploys**: Your site will automatically rebuild and deploy!

## Data Structure

```json
{
  "lastUpdated": "2025-09-01",
  "currentPlans": [
    {
      "category": "Planning|Building|Learning|Running|etc",
      "item": "What you're doing",
      "lastUpdated": "2025-09-01",
      "link": "https://optional-link.com" // optional field
    }
  ]
}
```

## Categories

Common categories you can use:
- Planning
- Building
- Learning
- Running
- Reading
- Writing
- Exploring
- Creating

## Tips

- Keep items concise and clear
- Update `lastUpdated` when you modify an item
- Links are optional - only add if relevant
- The first item's `lastUpdated` shows at the top of the page
- Items are displayed in the order they appear in the array
