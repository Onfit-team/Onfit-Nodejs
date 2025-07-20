import { spawn } from 'child_process';
import { CustomError } from '../../utils/error.js';

export const trainYoloModel = async (datasetId, mode) => {
  try {
    const now = new Date();
    const jobId = `train_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    const pythonPath = process.env.PYTHON_PATH || 'python';
    const proc = spawn(
      pythonPath,
      ['train.py', '--dataset', datasetId, '--mode', mode]
    );
    proc.on('error', (err) => {
      throw new CustomError("모델 학습 중 오류가 발생했습니다.", "M500", 500);
    });

    return {
      jobId,
      status: "RUNNING"
    };
  } catch (err) {
    throw new CustomError("모델 학습 중 오류가 발생했습니다.", "M500", 500);
  }
};
