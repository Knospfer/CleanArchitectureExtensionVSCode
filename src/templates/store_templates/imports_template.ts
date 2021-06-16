import { toSnakeCaseFiltered } from "../../utils/utils";

export function storeImports(fileName: string) {
    const snakeCaseFileName = toSnakeCaseFiltered(fileName, "imports");
    return `import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'package:sembast/sembast.dart';
    
import '/_core/core_imports.dart';

part "./data/data_source/local_data_source/${snakeCaseFileName}_local_data_source.dart";
part "./data/repository_concrete/${snakeCaseFileName}_repository_concrete.dart";
part "./domain/repository/${snakeCaseFileName}_repository.dart";
part './domain/use_case/${snakeCaseFileName}_use_case.dart';
part "./presentation/bloc/${snakeCaseFileName}/${snakeCaseFileName}_bloc.dart";
part "./presentation/bloc/${snakeCaseFileName}/${snakeCaseFileName}_event.dart";
part "./presentation/bloc/${snakeCaseFileName}/${snakeCaseFileName}_state.dart";`;
}