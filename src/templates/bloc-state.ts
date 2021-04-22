export function blocState(fileName: string) {
    return `abstract class AddEventState {
      const AddEventState();
    }
    
    class AddEventInitial extends AddEventState {}
    
    class AddEventLoading extends AddEventState {}
    
    class AddEventLoaded extends AddEventState {}
    
    class AddEventError extends AddEventState {}`;
}