export function blocEvent(fileName: string) {
    return `abstract class ${fileName}Event {
      const ${fileName}Event();
    }
    
    class AddToCacheEvent extends ${fileName}Event {
      final DATA_TO_IMPLEMENT data;
    
      AddToCacheEvent(this.data);
    } `;
}