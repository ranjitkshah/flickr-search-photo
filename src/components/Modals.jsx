import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ modalphoto, showModal, closeModal }) {
    return (

        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                open={showModal}
                onClose={closeModal}
            >
                <div className="flex justify-center pt-4 px-4 pb-10 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-800"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-800"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom  rounded-lg text-left shadow-xl transform transition-all  sm:align-middle w-10px  md:w-40px h-5px">
                            <img className="w-40px h-40px" src={`https://farm${modalphoto.farm}.staticflickr.com/${modalphoto.server}/${modalphoto.id}_${modalphoto.secret}.jpg`} />
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-end">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
