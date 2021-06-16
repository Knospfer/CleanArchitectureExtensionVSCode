import { toCamelCaseFiltered, toPascalCaseFiltered, toSnakeCaseFiltered } from "../../utils/utils";

export function storeBloc(fileName: string) {
  const snakeCaseFileName = toSnakeCaseFiltered(fileName, "bloc", "state", "imports");
  const pascalCaseFileName = toPascalCaseFiltered(fileName, "bloc", "state", "imports");
  const camelCaseFilename = toCamelCaseFiltered(fileName, "bloc", "state", "imports");

  return `part of '../../../${snakeCaseFileName}_imports.dart';
      
@injectable
class ${pascalCaseFileName}Bloc extends Bloc<${pascalCaseFileName}BaseEvent, ${pascalCaseFileName}State> {
  final ${pascalCaseFileName}UseCase ${camelCaseFilename}UseCase;
  late final StreamSubscription<Entity?> subscription;

  @override
  Future<void> close() {
    subscription.cancel();
    return super.close();
  }
    
  ${pascalCaseFileName}Bloc(this.${camelCaseFilename}UseCase) : super(${pascalCaseFileName}Empty()) {
    subscription = ${camelCaseFilename}UseCase(NoParams()).listen((data) {
      add(DataFetched(data));
    });
  }
    
  @override
  Stream<${pascalCaseFileName}State> mapEventToState(
    ${pascalCaseFileName}BaseEvent event,
  ) async* {
    if (event is DataFetched && event.data != null) {
      yield ${pascalCaseFileName}Updated(event.data);
    } else {
      yield ${pascalCaseFileName}Empty();
    }
  }
}`;
}