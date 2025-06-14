# Todo Application

A modern, responsive Todo application built with React and TypeScript.

## Testing Guide

### Manual Testing Steps

1. **Adding Todos**
   - Click the input field at the top
   - Enter a todo text
   - Select a priority level (Low, Medium, High)
   - Press Enter or click the Add button
   - Verify the new todo appears at the top of the list

2. **Completing Todos**
   - Click the checkbox next to any todo item
   - Verify the todo is marked as completed (strikethrough effect)
   - Click again to mark as incomplete

3. **Deleting Todos**
   - Click the delete (trash) icon next to any todo
   - Verify the todo is removed from the list

4. **Filtering Todos**
   - Use the filter buttons to switch between:
     - All todos
     - Active todos
     - Completed todos
   - Verify the list updates accordingly

5. **Sorting Todos**
   - Use the sort dropdown to change the order:
     - By date (newest first)
     - By priority
   - Verify the todos reorder correctly

6. **Clearing Completed**
   - Complete some todos
   - Click the "Clear Completed" button
   - Verify all completed todos are removed

7. **Persistence**
   - Add some todos
   - Refresh the page
   - Verify all todos are still present
   - Verify completed status is maintained

### Browser Compatibility
- Test in modern browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive design on different screen sizes

### Error Cases
- Try adding an empty todo (should be prevented)
- Try adding a very long todo text
- Test with multiple todos to verify scrolling behavior

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Vite 